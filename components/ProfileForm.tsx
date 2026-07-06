"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormField } from "@/components/FormField";
import { getRoleOption } from "@/components/onboarding";
import { PrimaryButton } from "@/components/PrimaryButton";

type ProfileFormProps = {
  roleId?: string;
};

export function ProfileForm({ roleId }: ProfileFormProps) {
  const router = useRouter();
  const role = getRoleOption(roleId);
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [country, setCountry] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function addSkill() {
    const nextSkill = skillInput.trim();

    if (!nextSkill || skills.includes(nextSkill)) {
      setSkillInput("");
      return;
    }

    setSkills((current) => [...current, nextSkill]);
    setSkillInput("");
  }

  function removeSkill(skill: string) {
    setSkills((current) => current.filter((item) => item !== skill));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = {
      fullName: fullName.trim() ? "" : "Full name is required.",
      organization: organization.trim() ? "" : "Organization is required.",
      jobTitle: jobTitle.trim() ? "" : "Job title is required.",
      country: country.trim() ? "" : "Country is required.",
      skills: skills.length > 0 ? "" : "Add at least one skill.",
    };

    const activeErrors = Object.fromEntries(
      Object.entries(nextErrors).filter(([, message]) => Boolean(message)),
    );
    setErrors(activeErrors);

    if (Object.keys(activeErrors).length > 0) {
      return;
    }

    const params = new URLSearchParams({
      role: role.id,
      name: fullName.trim(),
      organization: organization.trim(),
      title: jobTitle.trim(),
      country: country.trim(),
      skills: skills.join(","),
    });

    if (githubUrl.trim()) {
      params.set("github", githubUrl.trim());
    }

    router.push(`/access/workspace?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm text-cyan-100">
        Selected role: <span className="font-semibold">{role.title}</span>
      </div>

      <FormField label="Full Name" htmlFor="profile-full-name" error={errors.fullName}>
        <TextInput
          id="profile-full-name"
          value={fullName}
          placeholder="Stephen Raj"
          hasError={Boolean(errors.fullName)}
          onChange={(value) => {
            setFullName(value);
            setErrors((current) => ({ ...current, fullName: "" }));
          }}
        />
      </FormField>

      <FormField
        label="Organization"
        htmlFor="profile-organization"
        error={errors.organization}
      >
        <TextInput
          id="profile-organization"
          value={organization}
          placeholder="AIDIRAC Labs"
          hasError={Boolean(errors.organization)}
          onChange={(value) => {
            setOrganization(value);
            setErrors((current) => ({ ...current, organization: "" }));
          }}
        />
      </FormField>

      <div className="grid gap-5 md:grid-cols-2">
        <FormField label="Job Title" htmlFor="profile-job-title" error={errors.jobTitle}>
          <TextInput
            id="profile-job-title"
            value={jobTitle}
            placeholder="Frontend Engineer"
            hasError={Boolean(errors.jobTitle)}
            onChange={(value) => {
              setJobTitle(value);
              setErrors((current) => ({ ...current, jobTitle: "" }));
            }}
          />
        </FormField>

        <FormField label="Country" htmlFor="profile-country" error={errors.country}>
          <TextInput
            id="profile-country"
            value={country}
            placeholder="India"
            hasError={Boolean(errors.country)}
            onChange={(value) => {
              setCountry(value);
              setErrors((current) => ({ ...current, country: "" }));
            }}
          />
        </FormField>
      </div>

      <FormField label="Skills" htmlFor="profile-skills" error={errors.skills}>
        <div className="flex gap-2">
          <TextInput
            id="profile-skills"
            value={skillInput}
            placeholder="React"
            onChange={setSkillInput}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addSkill();
                setErrors((current) => ({ ...current, skills: "" }));
              }
            }}
          />
          <button
            type="button"
            onClick={() => {
              addSkill();
              setErrors((current) => ({ ...current, skills: "" }));
            }}
            className="h-12 shrink-0 rounded-lg border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/40 hover:bg-white/[0.07]"
          >
            Add
          </button>
        </div>
        {skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => removeSkill(skill)}
                className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-xs font-medium text-cyan-100"
              >
                {skill} x
              </button>
            ))}
          </div>
        )}
      </FormField>

      <FormField label="GitHub URL" htmlFor="profile-github" hint="Optional">
        <TextInput
          id="profile-github"
          value={githubUrl}
          placeholder="https://github.com/username"
          onChange={setGithubUrl}
        />
      </FormField>

      <PrimaryButton type="submit">Create Workspace Summary</PrimaryButton>
    </form>
  );
}

type TextInputProps = {
  id: string;
  value: string;
  placeholder: string;
  hasError?: boolean;
  onChange: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

function TextInput({
  id,
  value,
  placeholder,
  hasError = false,
  onChange,
  onKeyDown,
}: TextInputProps) {
  return (
    <input
      id={id}
      name={id}
      type="text"
      value={value}
      placeholder={placeholder}
      aria-invalid={hasError}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={onKeyDown}
      className={[
        "h-12 w-full rounded-lg border bg-slate-950/70 px-4 text-sm text-white outline-none transition placeholder:text-slate-600",
        hasError
          ? "border-red-300/70 focus:border-red-200 focus:ring-2 focus:ring-red-300/20"
          : "border-white/10 focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20",
      ].join(" ")}
    />
  );
}
