import { getAllWritingsMeta, WritingCategories, type WritingMeta } from '@/lib/writings';
import { WritingCard } from '@/components/WritingCard';

export const dynamic = 'force-static';

function WritingSection({ title, writings }: { title: string; writings: WritingMeta[] }) {
  if (writings.length === 0) return null;
  
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {writings.map((writing) => (
          <WritingCard key={writing.slug} writing={writing} />
        ))}
      </div>
    </section>
  );
}

export default async function WritingsPage() {
  const allWritings = await getAllWritingsMeta();
  
  const essays = allWritings.filter(w => w.category === 'essays');
  const operatingNotes = allWritings.filter(w => w.category === 'operating-notes');
  const manifestos = allWritings.filter(w => w.category === 'manifestos');
  const memos = allWritings.filter(w => w.category === 'memos');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Writings</h1>
        <p className="mt-2 text-muted-foreground">Edge Carolina memos, essays, and other writings.</p>
      </div>
      
      <WritingSection title="Edge Carolina Memos" writings={memos} />
      <WritingSection title="Essays" writings={essays} />
      <WritingSection title="Operating Notes" writings={operatingNotes} />
      <WritingSection title="Manifestos" writings={manifestos} />
    </div>
  );
}


