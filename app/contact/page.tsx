import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <p className="text-muted-foreground">I read most messages.</p>
      <div className="rounded-2xl border p-6">
        <a className="text-lg font-medium underline" href="mailto:hello@westonv.dev">
          westonvogle@gmail.com
        </a>
        <div className="mt-4 flex gap-4 text-sm">
          <Link className="hover:underline" href="https://github.com/WestonVoglesonger" target="_blank">
            GitHub
          </Link>
          <Link className="hover:underline" href="https://www.linkedin.com/in/weston-voglesonger" target="_blank">
            LinkedIn
          </Link>
        </div>
      </div>
    </div>
  );
}


