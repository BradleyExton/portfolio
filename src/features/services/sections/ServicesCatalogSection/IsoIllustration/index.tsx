import { AiToolsIllustration } from "./AiToolsIllustration";
import { WebAppIllustration } from "./WebAppIllustration";
import { WebsiteIllustration } from "./WebsiteIllustration";
import * as styles from "./styles";

const illustrationByServiceId: Record<string, () => React.JSX.Element> = {
  websites: WebsiteIllustration,
  "web-applications": WebAppIllustration,
  "ai-tools": AiToolsIllustration,
};

type IsoIllustrationProps = {
  serviceId: string;
  label: string;
};

export function IsoIllustration({ serviceId, label }: IsoIllustrationProps) {
  const Illustration = illustrationByServiceId[serviceId];

  if (!Illustration) {
    return null;
  }

  return (
    <div className={styles.scene} role="img" aria-label={label} data-illustration={serviceId}>
      <Illustration />
    </div>
  );
}
