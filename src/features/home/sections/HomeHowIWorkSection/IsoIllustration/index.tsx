import type { HowIWorkStageId } from "../types";
import { AgentsIllustration } from "./AgentsIllustration";
import { ContextIllustration } from "./ContextIllustration";
import { GatesIllustration } from "./GatesIllustration";
import { SpecIllustration } from "./SpecIllustration";
import * as styles from "./styles";

const illustrationByStageId: Record<HowIWorkStageId, () => React.JSX.Element> = {
  spec: SpecIllustration,
  context: ContextIllustration,
  agents: AgentsIllustration,
  gates: GatesIllustration,
};

type IsoIllustrationProps = {
  stageId: HowIWorkStageId;
};

export function IsoIllustration({ stageId }: IsoIllustrationProps) {
  const Illustration = illustrationByStageId[stageId];

  return (
    <div className={styles.scene} data-illustration={stageId}>
      <Illustration />
    </div>
  );
}
