"use client";

import * as z from "zod";
import * as React from "react";

import countries from "@/data/countries.json";
import states from "@/data/states.json";
import languages from "@/data/languages.json";

import { useTranslations } from "next-intl";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ProfileSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import { FormError } from "@/app/_components/auth/form-error";
import { FormSuccess } from "@/app/_components/auth/form-success";

import { profile } from "@/server/profile";

import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  LoaderCircle,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { UploadButton, UploadDropzone } from "@/lib/uploadthing";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Command as CommandPrimitive } from "cmdk";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type Framework = Record<"value" | "label", string>;

const FRAMEWORKS = [
  {
    value: "engineer",
    label: "Engineer",
  },
  {
    value: "doctor",
    label: "Doctor",
  },
  {
    value: "teacher",
    label: "Teacher",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
  {
    value: "wordpress",
    label: "WordPress",
  },
  {
    value: "express.js",
    label: "Express.js",
  },
  {
    value: "nest.js",
    label: "Nest.js",
  },
] satisfies Framework[];

export function ProfileForm({ user }: any) {
  console.log(user);
  const t = useTranslations("site");
  const schema = ProfileSchema(t);

  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Framework[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState<string>("05:00");
  const [date, setDate] = useState<Date | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      gender: user?.gender || undefined,
      country: user?.country || undefined,
      state: user?.state || undefined,
      dateofbirth: user?.dateofbirth || undefined,
      skills: user?.skills || undefined,
      language: user?.language || undefined,
      bio: user?.bio || undefined,
      image: user?.image || undefined,
      coverPhoto: user?.coverPhoto || undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setError("");
    setSuccess("");

    setIsPending(true);

    try {
      const data = await profile(values);
      if (data?.error) {
        setError(data.error);
      } else {
        setSuccess(data?.success);
        toast.success(data?.success);
      }
    } catch (err) {
      setError(t("error.default") as string);
    } finally {
      setIsPending(false);
    }
  };

  const genderOptions = [
    { label: t("auth.forms.gender.female"), value: "female" },
    { label: t("auth.forms.gender.male"), value: "male" },
    { label: t("auth.forms.gender.other"), value: "other" },
  ] as const;

  const countryOptions = countries.map((country) => ({
    label: `${country.name} (${country.iso2})`, // Örnek: "Turkey (TR)"
    value: country.iso2, // Örnek: "TR"
  }));

  const languageOptions = Object.entries(languages).map(([code, lang]) => ({
    label: `${lang.name} (${lang.nativeName})`, // Örnek: "English (English)"
    value: code, // Örnek: "en"
  }));

  // Seçilen ülkeye göre filtrelenmiş stateler
  const filteredStateOptions = selectedCountry
    ? states
        .filter((state) => state.country_code === selectedCountry)
        .map((state) => ({
          label: `${state.name} (${state.state_code})`, // Örnek: "Adana (01)"
          value: state.state_code, // Örnek: "01"
        }))
    : [];

  const handleUnselect = React.useCallback((framework: Framework) => {
    setSelected((prev) => prev.filter((s) => s.value !== framework.value));
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [],
  );

  const selectables = FRAMEWORKS.filter(
    (framework) => !selected.includes(framework),
  );

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid gap-5 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t("auth.forms.gender.title")}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? genderOptions.find(
                                (gender) => gender.value === field.value,
                              )?.label
                            : t("auth.forms.gender.select")}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        {/* <CommandInput placeholder={`${t("search")}...`} /> */}
                        <CommandList>
                          {/* <CommandEmpty>{t("noResults")}.</CommandEmpty> */}
                          <CommandGroup>
                            {genderOptions.map((gender) => (
                              <CommandItem
                                value={gender.label}
                                key={gender.value}
                                onSelect={() => {
                                  form.setValue("gender", gender.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4 capitalize",
                                    gender.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {gender.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateofbirth"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>{t("auth.forms.dateofbirth.title")}</FormLabel>
                  <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            `${format(field.value, "PPP")}`
                          ) : (
                            <span>{t("auth.forms.dateofbirth.select")}</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown"
                        selected={date || field.value}
                        onSelect={(selectedDate) => {
                          const [hours, minutes] = time?.split(":")!;
                          selectedDate?.setHours(
                            parseInt(hours),
                            parseInt(minutes),
                          );
                          setDate(selectedDate!);
                          field.onChange(selectedDate);
                        }}
                        onDayClick={() => setIsOpen(false)}
                        fromYear={1881}
                        toYear={new Date().getFullYear()}
                        disabled={(date) => Number(date) > Date.now()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t("auth.forms.country.title")}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? countryOptions.find(
                                (country) => country.value === field.value,
                              )?.label
                            : t("auth.forms.country.select")}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder={`${t("search")}...`} />
                        <CommandList>
                          <CommandEmpty>{t("noResults")}.</CommandEmpty>
                          <CommandGroup>
                            {countryOptions.map((country) => (
                              <CommandItem
                                value={country.label}
                                key={country.value}
                                onSelect={() => {
                                  form.setValue("country", country.value);
                                  setSelectedCountry(country.value);
                                  form.setValue("state", ""); // State seçim kutusunu sıfırlıyoruz
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4 capitalize",
                                    country.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {country.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t("auth.forms.state.title")}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground",
                            !selectedCountry && "cursor-not-allowed opacity-50",
                          )}
                          disabled={!selectedCountry}
                        >
                          {field.value
                            ? filteredStateOptions.find(
                                (state) => state.value === field.value,
                              )?.label
                            : t("auth.forms.state.select")}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    {selectedCountry && (
                      <PopoverContent className="p-0">
                        <Command>
                          <CommandInput placeholder={`${t("search")}...`} />
                          <CommandList>
                            <CommandEmpty>{t("noResults")}.</CommandEmpty>
                            <CommandGroup>
                              {filteredStateOptions.map((state) => (
                                <CommandItem
                                  value={state.label}
                                  key={state.value}
                                  onSelect={() => {
                                    form.setValue("state", state.value);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4 capitalize",
                                      state.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {state.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    )}
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t("auth.forms.language.title")}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? languageOptions.find(
                                (lang) => lang.value === field.value,
                              )?.label
                            : t("auth.forms.language.select")}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder={`${t("search")}...`} />
                        <CommandList>
                          <CommandEmpty>{t("noResults")}.</CommandEmpty>
                          <CommandGroup>
                            {languageOptions.map((lang) => (
                              <CommandItem
                                value={lang.label}
                                key={lang.value}
                                onSelect={() => {
                                  form.setValue("language", lang.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4 capitalize",
                                    lang.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {lang.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t("auth.forms.skills.title")}</FormLabel>
                  <Command
                    onKeyDown={handleKeyDown}
                    className="overflow-visible bg-transparent"
                  >
                    <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                      <div className="flex flex-wrap gap-1">
                        {selected.map((framework) => {
                          return (
                            <Badge key={framework.value} variant="secondary">
                              {framework.label}
                              <button
                                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleUnselect(framework);
                                  }
                                }}
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                                onClick={() => handleUnselect(framework)}
                              >
                                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                              </button>
                            </Badge>
                          );
                        })}
                        <CommandPrimitive.Input
                          ref={inputRef}
                          value={inputValue}
                          onValueChange={setInputValue}
                          onBlur={() => setOpen(false)}
                          onFocus={() => setOpen(true)}
                          placeholder={`${t("auth.forms.skills.select")}...`}
                          className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                        />
                      </div>
                    </div>
                    <div className="relative mt-2">
                      <CommandList>
                        {open && selectables.length > 0 ? (
                          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                            <CommandGroup className="h-full overflow-auto">
                              {selectables.map((framework) => {
                                return (
                                  <CommandItem
                                    key={framework.value}
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                    }}
                                    onSelect={(value) => {
                                      setInputValue("");
                                      setSelected((prev) => [
                                        ...prev,
                                        framework,
                                      ]);
                                    }}
                                    className={"cursor-pointer"}
                                  >
                                    {framework.label}
                                  </CommandItem>
                                );
                              })}
                            </CommandGroup>
                          </div>
                        ) : null}
                      </CommandList>
                    </div>
                  </Command>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.forms.bio.title")}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("auth.forms.bio.placeholder")}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.forms.photo.avatar")}</FormLabel>
                <FormControl className="border border-dashed p-10">
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      console.log("Files: ", res);
                      alert("Upload Completed");
                    }}
                    onUploadError={(error: Error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="coverPhoto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.forms.photo.coverPhoto")}</FormLabel>
                <FormControl className="border border-dashed p-10">
                  <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      console.log("Files: ", res);
                      alert("Upload Completed");
                    }}
                    onUploadError={(error: Error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormSuccess message={success} />
          <FormError message={error} />
          <Button disabled={isPending} type="submit" size="lg">
            {isPending ? (
              <span>
                <LoaderCircle className="animate-spin" />
              </span>
            ) : (
              <span>{t("auth.forms.save")}</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
