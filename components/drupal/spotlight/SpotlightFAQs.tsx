import Image from "next/image";
import { absoluteUrl } from "@/lib/utils"

export default function SpotlightFAQs({ data }: { data: any }) {
  return (
    <section className="participation section-space-top" id="playbook">

      {/* Pattern 1 */}
      <div className="pattern-1 pattern">
        <Image
          src="/images/prticipant-pattern1.svg"
          alt="pattern1"
          width={200}
          height={200}
        />
      </div>

      <div className="container" data-aos="fade-up">

        {/* Pattern 2 */}
        <div className="pattern-2 pattern">
          <Image
            src="/images/prticipant-pattern2.svg"
            alt="pattern2"
            width={200}
            height={200}
          />
        </div>

        {/* Pattern 3 */}
        <div className="pattern-3 pattern">
          <Image
            src="/images/prticipant-pattern3.svg"
            alt="pattern3"
            width={200}
            height={200}
          />
        </div>

        <h5 className="subtitle">{data.field_title_1?.processed || ""}</h5>
        <h2>{data.field_title_2?.processed || ""}</h2>

        <div
          className="disc"
          dangerouslySetInnerHTML={{ __html: data.field_description?.processed || "" }}>
        </div>

        {/* Accordion */}
        <div className="accordion" id="accordionExample">
          {data.field_faq_repeater?.map((element: any, index: number) => {
            return <div key={index} className="accordion-item">
              <div className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                >
                  <span className="left-side">
                    <span className="icon">
                      {element.field_icon?.field_media_image && (
                        <Image
                          width={24}
                          height={24}
                          src={absoluteUrl(element.field_icon.field_media_image.uri.url)}
                          alt={element.field_icon.field_media_image.resourceIdObjMeta.alt || ""}
                          priority
                        />
                      )}
                    </span>
                    <span className="title">{element.field_title}</span>
                  </span>
                </button>
              </div>

              <div
                id={`collapse${index}`}
                className={`accordion-collapse collapse ${index === 0 && 'show'}`}
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body" dangerouslySetInnerHTML={{
                  __html: element.field_content?.processed || "",
                }}>
                </div>
              </div>
            </div>
          })}

        </div>
      </div>
    </section>
  );
}