#!/bin/bash

# --- Configuration ---
DB_NAME="test"
DB_USER="anlam"
DB_HOST="localhost"
DB_PORT="5432"
LOG_FILE="setup_validation.log"

# Function to write to log file without ANSI colors
log_to_file() {
    echo -e "$1" | sed 's/\x1b\[[0-9;]*m//g' >> "$LOG_FILE"
}

validate_database(){
    local is_valid_db=true
    local timestamp=$(date "+%Y-%m-%d %H:%M:%S")
        echo "Check DB_USER: $DB_USER" >> "$LOG_FILE"
     echo "Check DB_NAME: $DB_NAME" >> "$LOG_FILE"
      echo "Check DB_HOST: $DB_HOST" >> "$LOG_FILE"
       echo "Check DB_PORT: $DB_PORT" >> "$LOG_FILE"
    echo "--- Validation Started: $timestamp ---" >> "$LOG_FILE"

    # Refresh stats before checking
    psql -U $DB_USER -d $DB_NAME -h $DB_HOST -c "ANALYZE;" > /dev/null 2>&1

    SCHEMA_DATA=$(psql -U $DB_USER -d $DB_NAME -h $DB_HOST -p $DB_PORT -t -A -F'|' -c "
    SELECT 
        t.relname AS table_name, 
        t.n_live_tup AS row_count,
        (SELECT string_agg(column_name, ', ' ORDER BY ordinal_position) 
        FROM information_schema.columns 
        WHERE table_name = t.relname AND table_schema = 'public') AS columns
    FROM pg_stat_user_tables t
    WHERE t.schemaname = 'public'
    ORDER BY t.relname;")

    header="\n📊 \033[1mDatabase Statistics and Schema:\033[0m\n"
    echo -e "$header"
    log_to_file "$header"

    if [ -z "$SCHEMA_DATA" ]; then
        msg="⚠️ No tables found in database '$DB_NAME'."
        echo "$msg"
        log_to_file "$msg"
        is_valid_db=false
    else
        while IFS='|' read -r table count columns; do
            if [ "$count" -eq 0 ]; then
                COUNT_DISPLAY="\033[0;31m$count rows\033[0m"
            else
                COUNT_DISPLAY="\033[1;33m$count rows\033[0m"
            fi

            local table_status_text=""
            local table_status_color=""
            local is_table_ok=true

            case "$table" in
                "principles") [[ "$count" -lt 20116527 ]] && is_table_ok=false ;;
                "titles")     [[ "$count" -lt 9091745 ]]  && is_table_ok=false ;;
                *)            [[ "$count" -eq 0 ]]        && is_table_ok=false ;;
            esac

            if [ "$is_table_ok" = true ]; then
                table_status_color="\033[0;32mPASS\033[0m"
                table_status_text="PASS"
            else
                table_status_color="\033[0;31mFAIL\033[0m"
                table_status_text="FAIL"
                is_valid_db=false
            fi

            # Format the line
            line="Table: $table ($count rows) $table_status_text"
            echo -e "\033[1;34mTable:\033[0m $table ($COUNT_DISPLAY) $table_status_color"
            log_to_file "$line"
            
            echo -e "  └─ \033[0;32mColumns:\033[0m ${columns:-'No columns found'}" >> "$LOG_FILE"
            echo "----------------------------------------------------"
        done <<< "$SCHEMA_DATA"

        if [ "$is_valid_db" = true ]; then
            validation_message="\033[0;32mPASS\033[0m"
            log_to_file "Overall Result: PASS"
        else
            validation_message="\033[0;31mFAIL\033[0m"
            log_to_file "Overall Result: FAIL"
        fi

        echo -e "\n \033[1mDatabase validation $validation_message:\033[0m\n" 
    fi
    
    echo "--- Validation Finished ---" >> "$LOG_FILE"
    if [ "$is_valid_db" = true ]; then
        return 0  # This tells Bash "Success/True"
    else
        return 1  # This tells Bash "Failure/False"
    fi
}