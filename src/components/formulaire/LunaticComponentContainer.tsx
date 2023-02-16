import { PropsWithChildren } from "react";

type LunaticComponentContainerProps = PropsWithChildren<{ id: string }>;

function LunaticComponentContainer({
  children,
  id,
}: LunaticComponentContainerProps) {
  return (
    <div className="lunatic lunatic-component" id={`lunatic-component-${id}`}>
      {children}
    </div>
  );
}

export default LunaticComponentContainer;
