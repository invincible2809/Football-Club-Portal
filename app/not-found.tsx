import { PageHeader, Section, ButtonLink } from '@/components/ui';

export default function NotFound() {
  return (
    <>
      <PageHeader title="Offside!" intro="We couldn't find that page." />
      <Section>
        <ButtonLink href="/">Back to the home page</ButtonLink>
      </Section>
    </>
  );
}
