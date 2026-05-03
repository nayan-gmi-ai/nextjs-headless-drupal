import type { DrupalNode } from "next-drupal"
import SpotlightFold1 from "./spotlight/SpotlightFold1";
import SpotlightFold2 from "./spotlight/SpotlightFold2";
import SpotlightFAQs from "./spotlight/SpotlightFAQs";
import SpotlightTeam from "./spotlight/SpotlightTeam";

interface SobhaSpotlightProps {
  node: DrupalNode
}

const componentMap: Record<string, React.ComponentType<any>> = {
  "paragraph--spotlight_fold_1": SpotlightFold1,
  "paragraph--spotlight_fold_2": SpotlightFold2,
  "paragraph--spotlight_faq_s": SpotlightFAQs,
  "paragraph--spotlight_team_members": SpotlightTeam,
};

export function SobhaSpotlight({ node }: SobhaSpotlightProps) {
  return (
    <>
      {node.field_components?.map((element: any, index: number) => {
        const Component = componentMap[element.type];

        if (!Component) {
          return null;
        }

        return <Component key={index} data={element} />;
      })}
    </>
  );
}
