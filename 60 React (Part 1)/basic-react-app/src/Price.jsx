export default function Price({oldPrice, newPrice}) {
    let oldStyles = {
        textDecorationLine: "line-through",

    };
    let newStyles = {
        fontWeight: "bold",

    };
    let styles = {
        backgroundColor: "#e03c97",
        heigt: "50px", 
        borderRadius: "15px",
    };
    return (
        <div style={styles}>
            <span style={oldStyles}>{oldPrice}</span>
            <span style={newStyles}>{newPrice}</span>
        </div>
    );
}