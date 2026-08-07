import type { CapabilityId } from "../types";
import { AiIllustration } from "./AiIllustration";
import { DeliveryIllustration } from "./DeliveryIllustration";
import { FrontendIllustration } from "./FrontendIllustration";
import { PlatformIllustration } from "./PlatformIllustration";
import * as styles from "./styles";

const illustrationByCapabilityId: Record<CapabilityId, () => React.JSX.Element> = {
  ai: AiIllustration,
  delivery: DeliveryIllustration,
  frontend: FrontendIllustration,
  platform: PlatformIllustration,
};

type IsoIllustrationVariant = keyof typeof styles.sceneByVariant;

type IsoIllustrationProps = {
  capabilityId: CapabilityId;
  variant?: IsoIllustrationVariant;
};

export function IsoIllustration({ capabilityId, variant = "panel" }: IsoIllustrationProps) {
  const Illustration = illustrationByCapabilityId[capabilityId];

  return (
    <div className={styles.sceneByVariant[variant]} data-illustration={capabilityId}>
      <Illustration />
    </div>
  );
}
