"use client";

import { useEffect, useState } from "react";
import { Phone, Mail, MessageCircle, Save, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  getSiteSettingsAction,
  updateSiteSettingsAction,
} from "@/lib/admin/actions";

interface ContactForm {
  phone: string;
  email: string;
  whatsapp: string;
}

const EMPTY: ContactForm = { phone: "", email: "", whatsapp: "" };

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [form, setForm] = useState<ContactForm>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const result = await getSiteSettingsAction();
        if (result.data) {
          setForm({
            phone: result.data.phone ?? "",
            email: result.data.email ?? "",
            whatsapp: result.data.whatsapp ?? "",
          });
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function update(field: keyof ContactForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const result = await updateSiteSettingsAction(form);
      if (result.success) {
        toast({
          title: "Saved",
          description: "Contact details updated across the site.",
        });
      } else {
        toast({
          title: "Could not save",
          description: result.error || "Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          These contact details are used everywhere on the website — the top
          bar, navigation, footer, floating contact button, the contact page and
          customer emails.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            Update your phone number, email and WhatsApp number. Changes go live
            immediately after saving.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center gap-2 py-8 text-slate-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Loading current settings…</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-600" />
                  Phone number
                </Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+1 662 400-0864"
                  required
                />
                <p className="text-xs text-slate-500">
                  Shown as-is on the site. Include the country code so the
                  &ldquo;call&rdquo; links work (e.g. +1 662 400-0864).
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  Contact email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="sales@customtrailerspro.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-blue-600" />
                  WhatsApp number
                </Label>
                <Input
                  id="whatsapp"
                  value={form.whatsapp}
                  onChange={(e) => update("whatsapp", e.target.value)}
                  placeholder="16624000864"
                  required
                />
                <p className="text-xs text-slate-500">
                  Digits only, with country code, no + or spaces (e.g.
                  16624000864). Used for the WhatsApp button.
                </p>
              </div>

              <div className="flex justify-end border-t border-slate-100 pt-4">
                <Button type="submit" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving…
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
