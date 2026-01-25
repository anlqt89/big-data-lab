export const cleanValue = (val) => {
    if (typeof val !== 'string') return val;
    return val.replace(/^"|"$/g, '').trim();
};

export const cleanRequestKeys = (queryObj) => {
    const cleaned = {}; 
    for (const [key, value] of Object.entries(queryObj)) {
        if(key){
             cleaned[key] = cleanValue(value);
        }
       
    }
    return cleaned;
};