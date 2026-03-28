import { RaceDetailContent } from "@/components/RaceDetailContent";
import type { MeetCode } from "@/lib/types";

// Static export: bypass Next.js 16 check that requires generateStaticParams to return non-empty.
// revalidate=0 skips the "missing generateStaticParams" validation for output:"export".
// At build time, no HTML is pre-rendered for this dynamic route.
// Client-side navigation via Next.js Link works; direct URL needs 404.html SPA fallback.
export const revalidate = 0;

interface Params {
  meet: string;
  date: string;
  rcNo: string;
}

export default async function RaceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { meet: meetStr, date, rcNo: rcNoStr } = await params;
  const meet = Number(meetStr) as MeetCode;
  const rcNo = Number(rcNoStr);

  return <RaceDetailContent meet={meet} date={date} rcNo={rcNo} />;
}
