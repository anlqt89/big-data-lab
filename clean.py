import csv

input_file = './data/title.actors.csv'
output_file = './data/title.actors_cleaned.csv'

with open(input_file, 'r', encoding='utf-8') as f_in, \
     open(output_file, 'w', encoding='utf-8', newline='') as f_out:
    
    # We read it as plain text first to handle the varying comma counts
    reader = csv.reader(f_in)
    writer = csv.writer(f_out, quoting=csv.QUOTE_MINIMAL)
    
    # Handle Header
    header = next(reader)
    writer.writerow(['tconst', 'nconst', 'primaryname'])

    for row in reader:
        if len(row) < 3:
            continue # Skip empty or broken lines
        
        tconst = row[0]
        nconst = row[1]
        
        # Merge everything from index 2 onwards into one string
        # This turns: ["tt1", "nm1", "First", "Last"] -> "First Last"
        primaryname = " ".join(row[2:]) 
        
        writer.writerow([tconst, nconst, primaryname])

print(f"Done! Cleaned file saved to {output_file}")