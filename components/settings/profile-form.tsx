"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, LoaderCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/components/auth/auth-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const profileSchema = z.object({
  fullName: z.string().trim().min(2, "Enter at least 2 characters"),
  email: z.email("Enter a valid email address"),
  jobTitle: z.string().trim().min(2, "Enter your job title"),
  company: z.string().trim().min(2, "Enter your company name"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]{8,20}$/, "Enter a valid phone number"),
});
export type ProfileValues = z.infer<typeof profileSchema>;

export function ProfileForm({
  notify,
}: {
  notify: (kind: "success" | "error", message: string) => void;
}) {
  const { user, isReady, updateProfile } = useAuth();
  const [saving, setSaving] = useState(false);
  const profile = useMemo<ProfileValues>(
    () => ({
      fullName: user?.name ?? "",
      email: user?.email ?? "",
      jobTitle: user?.jobTitle ?? "",
      company: user?.company ?? "",
      phone: user?.phone ?? "",
    }),
    [user],
  );
  const initials =
    profile.fullName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: profile,
    values: profile,
    mode: "onChange",
  });
  const save = async (values: ProfileValues) => {
    setSaving(true);
    try {
      await updateProfile({
        name: values.fullName,
        email: values.email,
        jobTitle: values.jobTitle,
        company: values.company,
        phone: values.phone,
      });
      reset(values);
      notify("success", "Profile changes saved.");
    } catch {
      notify("error", "We couldn’t save your changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };
  const fields = [
    ["fullName", "Full name", "text", "Your full name"],
    ["email", "Email address", "email", "you@company.com"],
    ["jobTitle", "Job title", "text", "Your role"],
    ["company", "Company name", "text", "Your company"],
    ["phone", "Phone number", "tel", "+1 555 000 0000"],
  ] as const;
  return (
    <form
      onSubmit={handleSubmit(save)}
      className="space-y-6"
      noValidate
      aria-busy={!isReady || saving}
    >
      <div className="flex items-center gap-4">
        <Avatar className="size-16">
          <AvatarFallback className="bg-primary text-lg font-semibold text-primary-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <Button type="button" variant="outline">
            <Camera aria-hidden />
            Change photo
          </Button>
          <p className="mt-1.5 text-xs text-muted-foreground">
            JPG or PNG. Max 2 MB.
          </p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map(([name, label, type, placeholder]) => (
          <div key={name} className={name === "phone" ? "sm:col-span-2" : ""}>
            <Label htmlFor={name}>{label}</Label>
            <Input
              id={name}
              type={type}
              placeholder={placeholder}
              aria-invalid={!!errors[name]}
              aria-describedby={errors[name] ? `${name}-error` : undefined}
              className="mt-1.5"
              disabled={!isReady || saving}
              {...register(name)}
            />
            {errors[name] && (
              <p
                id={`${name}-error`}
                role="alert"
                className="mt-1 text-xs text-destructive"
              >
                {errors[name]?.message}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-2 border-t pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => reset(profile)}
          disabled={!isDirty || saving}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={!isDirty || !isValid || saving}>
          {saving && <LoaderCircle aria-hidden className="animate-spin" />}
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
