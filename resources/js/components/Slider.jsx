import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Slider() {
    return (
        <Swiper
            spaceBetween={0}
            slidesPerView={1}
            style={{ width: "100vw", height: "60vh" }}
        >
            <SwiperSlide>
                <img
                    src="images/home_img1.jpg"
                    alt=""
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </SwiperSlide>

            <SwiperSlide>
                <img
                    src="images/home_img2.jpg"
                    alt=""
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </SwiperSlide>

            <SwiperSlide>
                <img
                    src="images/home_img3.jpg"
                    alt=""
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </SwiperSlide>
        </Swiper>
    );
}
