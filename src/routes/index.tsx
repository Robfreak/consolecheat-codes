import { createFileRoute } from "@tanstack/react-router";
import { CodesPage } from "@/components/codes-page";

export const Route = createFileRoute("/")({
  component: CodesPage,
});
