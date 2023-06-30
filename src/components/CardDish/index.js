export default function CardDish({dish}){
    const styles = {    
        card_dish : {
            width: "220px",
            height: "200px",
            backgroundColor: "rgba(255, 255, 255,0.15)",
            margin: "5px",
            position: "relative",
            borderRadius: "10px",
            overflow: "hidden",
            border: "2px solid #e5e5e5",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        },
        dish_image: {
            width: "100%",
            maxHeight: "150px",
            objectFit: "cover",
            position: "absolute",
            left: "0px",
        },
        name: {
            width: "90%",
            position: "absolute",
            bottom: "30px",
            left: "10px",
            fontSize: "14px",
            color: "rgba(255, 255, 255, 0.9)",
            whiteSpace: 'nowrap', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis',
        },
        address: {
            width: "90%",
            position: "absolute",
            bottom: "10px",
            left: "10px",
            fontSize: "13px",
            color: "rgba(255, 255, 255, 0.6)",
            whiteSpace: 'nowrap', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis'
        }
    }
    const handleClick = () => {
        window.open(dish.url, "_blank");
    };

    return (
    <div style={styles.card_dish} onClick={handleClick}>
        <p style={styles.name}>{dish.name}</p>
        <p style={styles.address}>{dish.address}</p>
        <img style={styles.dish_image} src={dish.image_url} alt= {dish.name}/>    
    </div>
    )
}