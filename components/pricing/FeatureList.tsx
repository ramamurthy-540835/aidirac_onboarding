type FeatureListProps = {
  features: string[];
};

export function FeatureList({ features }: FeatureListProps) {
  if (features.length === 0) {
    return (
      <p className="text-sm leading-6 text-slate-500">
        Feature details are not available for this plan yet.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {features.map((feature) => (
        <li key={feature} className="flex gap-3 text-sm leading-6 text-slate-300">
          <span
            aria-hidden="true"
            className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan-300"
          />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}
