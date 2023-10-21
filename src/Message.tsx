// CamelCasing
function Message(){
    const name = 'Krisha'
    // JSX: JavaScript XML
    // we can write expressions-expression is something that returns a value. we can write dynamic code inside jsx. We can write if else too
    if (name)
        return <h1>Hello {name}</h1>;
    return <h1>Hello World</h1>;
}

export default Message;