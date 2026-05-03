import Image from "next/image";
import { absoluteUrl } from "@/lib/utils"

export default function SpotlightTeam({ data }: { data: any }) {
  return (
    <section className="meet-masters section-space-top" id="jury-sec" >
      <div className="container" data-aos="fade-up">
        <h2>{data.field_heading}</h2>
        <div className="disc" dangerouslySetInnerHTML={{ __html: data.field_description?.processed || "" }}></div>
        <div className="row meet-team-row">

          {data.field_team_members?.map((element: any, index: number) => {
            return <div key={index} className="col-sm-4 meet-team-col">
              <div className="team-box">
                {element.field_profile_image?.field_media_image && (
                  <Image
                    width={384}
                    height={474}
                    className="team-img"
                    src={absoluteUrl(element.field_profile_image?.field_media_image.uri.url)}
                    alt={element.field_profile_image?.field_media_image.resourceIdObjMeta.alt || ""}
                    priority
                  />
                )}
                <div
                  className="discrib"
                  dangerouslySetInnerHTML={{ __html: `<span class="name">${element.field_member_name}</span><p>${element.field_job_title?.processed || ""}</p>` }}
                >
                </div>
              </div>
            </div>
          })}

        </div>
        <div className="protips" dangerouslySetInnerHTML={{ __html: data.field_footer_content?.processed || "" }}></div>
      </div>
    </section>
  );
}