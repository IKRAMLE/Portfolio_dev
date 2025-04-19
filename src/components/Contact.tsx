
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Mail, User, Send, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ikramlechqer', icon: Linkedin },
    { name: 'GitHub', url: 'https://github.com/ikramlechqer', icon: Github },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('access_key', '4956a79d-f842-4769-9a89-998dffd7dee0');
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('message', values.message);
      formData.append('subject', 'New Contact from Portfolio Website');
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(t('contact.success'), {
          description: t('contact.successMessage'),
          // Add the thank you message here
          action: {
            label: 'Web3Forms Access Key',
            onClick: () => {
              navigator.clipboard.writeText('4956a79d-f842-4769-9a89-998dffd7dee0');
              toast.info('Access Key Copied to Clipboard');
            }
          }
        });
        form.reset();
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(t('contact.error'), {
        description: t('contact.errorMessage'),
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className={cn(
      "py-20 w-full relative",
      language === 'ar' ? 'font-sans rtl' : ''
    )}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] to-[#121212] z-0">
        <div className="absolute inset-0 opacity-20">
          <div className="particles-container"></div>
        </div>
      </div>
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-accent uppercase text-sm font-medium tracking-wider">
            {t('contact.title')}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-4 text-gradient">
            {t('contact.title')}
          </h2>
          <div className="h-1 w-20 bg-accent/60 mx-auto rounded-full"></div>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 rounded-xl p-1">
            <div className="glass-card rounded-xl p-8 border border-accent/20 shadow-[0_0_25px_rgba(124,58,237,0.1)]">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">{t('contact.name')}</FormLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <User className="h-4 w-4 text-accent/70" />
                          </div>
                          <FormControl>
                            <Input
                              placeholder={t('contact.namePlaceholder')}
                              className="pl-10 bg-secondary/30 border-white/10 text-white placeholder:text-white/30 focus:border-accent/50 focus:ring-1 focus:ring-accent/50"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">{t('contact.email')}</FormLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Mail className="h-4 w-4 text-accent/70" />
                          </div>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder={t('contact.emailPlaceholder')}
                              className="pl-10 bg-secondary/30 border-white/10 text-white placeholder:text-white/30 focus:border-accent/50 focus:ring-1 focus:ring-accent/50"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">{t('contact.message')}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t('contact.messagePlaceholder')}
                            rows={5}
                            className="bg-secondary/30 border-white/10 text-white placeholder:text-white/30 focus:border-accent/50 focus:ring-1 focus:ring-accent/50 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-accent hover:bg-accent/90 text-white w-full py-6 transition-colors"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="h-5 w-5 border-2 border-white/80 border-t-transparent rounded-full mr-2"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <span>{t('contact.send')}</span>
                        <Send className="ml-2 h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="glass-card rounded-xl p-8 h-1/2 border border-accent/20 shadow-[0_0_25px_rgba(124,58,237,0.1)] relative overflow-hidden">
              <h3 className="text-xl font-semibold text-white mb-6">Get in Touch</h3>
              <div className="space-y-4 relative z-10">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-4">
                    <Mail className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Email</p>
                    <a href="mailto:ikram.lechqer@example.com" className="text-white hover:text-accent transition-colors">
                      ikram.lechqer@example.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-8 h-1/2 border border-accent/20 shadow-[0_0_25px_rgba(124,58,237,0.1)] relative overflow-hidden">
              <h3 className="text-xl font-semibold text-white mb-6">Follow Me</h3>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group"
                  >
                    <div className="flex flex-col items-center bg-secondary/40 rounded-lg p-4 border border-white/5">
                      <social.icon className="h-6 w-6 text-white/80" />
                      <span className="text-white/60 text-sm">{social.name}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
