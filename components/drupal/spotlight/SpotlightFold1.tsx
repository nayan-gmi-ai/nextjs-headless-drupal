import Image from "next/image";
import { absoluteUrl } from "@/lib/utils"

export default function SpotlightFold1({ data }: { data: any }) {
  return <section className="intro-section">
    <div className="gradient-left"></div>
    <div className="gradient-top"></div>
    <div className="gradient-right"></div>
    <div className="gradient-bottom"></div>

    <div className="main-title">
      <div className="disc">
        <h1
          className="title-1"
          dangerouslySetInnerHTML={{
            __html: data.field_title_1?.processed || "",
          }}
        />

        <h2 className="title-2"
          dangerouslySetInnerHTML={{
            __html: data.field_title_2?.processed || "",
          }}
        />

      </div>
    </div>

    <div className="screen-1">
      {data.field_top_image.field_media_image && (
        <Image
          src={absoluteUrl(data.field_top_image.field_media_image.uri.url)}
          width={768}
          height={400}
          alt={data.field_top_image.field_media_image.resourceIdObjMeta.alt || ""}
          priority
        />
      )}
    </div>

    <div className="judges-image">
      <div className="jdgs-img">
        {data.field_image_desktop.field_media_image && (
          <Image
            src={absoluteUrl(data.field_image_desktop.field_media_image.uri.url)}
            className="only-desk"
            width={824}
            height={272}
            alt={data.field_image_desktop.field_media_image.resourceIdObjMeta.alt || ""}
            priority
          />
        )}
        {data.field_image_mobile.field_media_image && (
          <Image
            src={absoluteUrl(data.field_image_mobile.field_media_image.uri.url)}
            className="only-mob"
            width={375}
            height={135}
            alt={data.field_image_mobile.field_media_image.resourceIdObjMeta.alt || ""}
            priority
          />
        )}
      </div>
    </div>

    <div className="bottom-registration">
      <div className="bttm-reg-box">
        <a href="#register" className="banner-reg" data-once="reg-your-int-cta generic-cta">
          <div className="reg-button">
            <i>register now </i><svg xmlns="http://www.w3.org/2000/svg" width="17" height="10" viewBox="0 0 17 10" fill="none">
              <path d="M0.75 5L15.3214 5" stroke="#3C3E59" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M11.0714 0.75L15.3214 5L11.0714 9.25" stroke="#3C3E59" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
          <div id="lottie"></div>
        </a>
      </div>
    </div>
  </section >
}