import { UserContext } from "../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import Food from "./food";
import Header from "./Header";

function Track() {
    const [foodItems, setFoodItems] = useState([]);
    const [food, setFood] = useState(null);

    useEffect(() => {
        console.log(food);
    }, [food]);

    const loggedData = useContext(UserContext);

    function searchFood(event) {
        if (event.target.value.length !== 0) {
            fetch(`https://nutrient-tracker-backend.onrender.com/foods/${event.target.value}`, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + loggedData.loggedUser.token
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.message === undefined) {
                        setFoodItems(data);
                    } else {
                        setFoodItems([]);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setFoodItems([]);
        }
    }

    return (
        <div>
            <Header />
            <div className="track-container">
                <input
                    className="search-inp"
                    onChange={searchFood}
                    type="search"
                    placeholder="Search Food Item"
                />
                <div className="search">
                    {foodItems.length !== 0 ? (
                        <div className="search-results">
                            {foodItems.map((item) => (
                                <p
                                    className="item"
                                    onClick={() => {
                                        setFood(item);
                                    }}
                                    key={item._id}
                                >
                                    {item.name}
                                </p>
                            ))}
                        </div>
                    ) : (
                        <h2 className="tarck-head">
                            Let's Search a Food .
                        </h2>
                    )}
                </div>
                {food !== null && <Food item={food} />}
            </div>
        </div>
    );
}

export default Track;
