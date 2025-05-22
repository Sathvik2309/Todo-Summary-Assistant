    // db.js
    const { createClient } = require('@supabase/supabase-js');

    const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
    );

    const getTodos = async () => {
    const { data, error } = await supabase
        .from('todos')
        .select('*');

    if (error) {
        console.error('Error fetching todos:', error);
        return [];
    }

    return data;
    };

    const addTodo = async (text) => {
    const { data, error } = await supabase
        .from('todos')
        .insert([{ text }]);

    if (error) {
        console.error('Error adding todo:', error);
        return null;
    }

    return data[0];
    };

    module.exports = { getTodos, addTodo };
