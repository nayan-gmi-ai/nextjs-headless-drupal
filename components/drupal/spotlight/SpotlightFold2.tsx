import Image from "next/image";
import SpotlightForm from "./SpotlightForm";

export default function SpotlightFold2({ data }: { data: any }) {
  return <>
    <section className="about-sec section-space-top" id="aboutus">
      <div className="container">
        <div className="disc">
          <h5 className="subtitle">{data.field_title_1?.processed || ""}</h5>
          <h2>{data.field_title_2?.processed || ""}</h2>
          <div dangerouslySetInnerHTML={{ __html: data.field_description?.processed || "" }} />
        </div>
      </div>
      <section className="masters-scroll-sec">
        <div className="light-sec">
          <div className="title-sec">
            <p>{"You're Here Now"}</p>
            <Image
              width={33}
              height={28}
              src="/images/arrow-for-light.svg"
              alt="Arrow"
            />
          </div>
          <Image
            width={592}
            height={674}
            className="light-blink"
            src="/images/cieling-light.png"
            alt="Light"
          />
        </div>

        <div className="masters-section ">
          <div className="swiper mastersSwiper">
            <div className="swiper-wrapper">
              {data.field_card_repeater?.map((element: any, index: number) => {
                return <div key={index} className="swiper-slide">
                  <div className="master-card">
                    <div className="card-details">
                      <h5>{element.field_title_1?.processed || ""}</h5>
                      <h4>{element.field_title_2?.processed || ""}</h4>
                      <span className="devider"></span>
                      <div dangerouslySetInnerHTML={{ __html: element.field_description?.processed || "" }} />
                    </div>
                  </div>
                </div>
              })}
            </div>
          </div>
        </div>

      </section>
    </section>
    <SpotlightForm />
  </>
}