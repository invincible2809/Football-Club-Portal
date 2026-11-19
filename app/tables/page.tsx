import type { Metadata } from 'next';
import { club, teams, fulltimeTeamUrl } from '@/lib/data';
import { PageHeader, Section, Prose } from '@/components/ui';

export const metadata: Metadata = { title: 'League Tables' };

export default function TablesPage() {
  const competitive = teams.filter((t) => t.format === 'competitive');
  return (
    <>
      <PageHeader title="League tables" />
      <Section>
        <Prose>
          {competitive.length === 0 ? (
            <p>
              All our current teams play <strong>development football</strong>. In line with FA youth football rules, no results or league
              tables are published for these age groups. Games are about development and enjoyment, not points.
            </p>
          ) : (
            <p>League tables for our competitive teams are published on FA Full-Time:</p>
          )}
          <ul>
            {teams.map((t) => {
              const url = fulltimeTeamUrl(t);
              return url ? (
                <li key={t.slug}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {t.name}
                  </a>
                </li>
              ) : null;
            })}
          </ul>
          <p>
            Full league information: <a href={club.league.url}>{club.league.name} on FA Full-Time</a>.
          </p>
        </Prose>
      </Section>
    </>
  );
}
