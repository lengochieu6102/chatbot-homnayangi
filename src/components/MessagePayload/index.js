import CardDish from "../CardDish";

export default function MessagePayload({payload}){
    const styles = {    
        list_card_dish : {
            display : 'flex',
            width : '100%',
            flexWrap: "wrap",
            gap: "10px",
            marginTop: '10px',
        }
    }
    const list_card_dist = payload.map((dish,index) => 
        <CardDish key={index} dish={dish}/>
    );
    return (
    <div style = {styles.list_card_dish}>
        {list_card_dist}
    </div>
    )
}