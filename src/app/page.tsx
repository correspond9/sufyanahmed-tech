import { Background } from "@/components/ui/background";
import { Container } from "@/components/ui/container";

export default function HomePage() {
  return (
    <Background variant="glow">
      <Container className="flex min-h-[50vh] items-center justify-center" />
    </Background>
  );
}
