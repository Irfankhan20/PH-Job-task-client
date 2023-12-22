
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'


const Review = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('reviews.json')
            .then(res => res.json())
            .then(data => {
                console.log(data); // Log the data to the console
                setReviews(data);
            })
            .catch(error => console.error('Error fetching reviews:', error));
    }, []);
    

    return (
        <section className="my-20 mx-auto max-w-7xl">
            <h2 className="text-center text-3xl font-semibold">User <span className="text-[#23e6e6]">Reviews</span></h2>

            <Swiper navigation={true}  modules={[Navigation]} className="mySwiper">

                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}
                    >
                        <div className="flex flex-col items-center mx-24 my-16">
                            
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p className="py-8">{review.details}</p>
                            <h3 className="text-2xl text-[#23e6e6]">{review.name}</h3>
                            <h3 className="text-2xl text-[#23e6e6]">Profession: {review.profession}</h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Review;