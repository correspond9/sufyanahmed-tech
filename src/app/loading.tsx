import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <Container className="flex min-h-[50vh] items-center justify-center">
      <div
        className="border-primary size-8 animate-pulse rounded-full border-2 border-t-transparent"
        role="status"
        aria-label="Loading"
      />
    </Container>
  );
}
