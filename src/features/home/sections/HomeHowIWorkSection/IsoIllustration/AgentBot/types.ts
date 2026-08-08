/** Which tool a bot stands for; picks the mark on its chest. */
export type AgentKind = "claude" | "codex" | "gemini";

export type AgentBotProps = {
  kind: AgentKind;
  /** Scene-local placement: translate(padCentreX, padCentreY). Feet sit on the origin. */
  transform: string;
};
