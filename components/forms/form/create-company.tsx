'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';

const formSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  companyWebpage: z.string().url('Invalid URL'),
  companyDescription: z.string().min(1, 'Company description is required'),
  productDescription: z.string().min(1, 'Product/Service description is required'),
  toneOfVoice: z.enum(['Simon Sinek', 'Alex Hormozi']),
  strategy: z.enum(['FOMO', 'AMSI']),
});

export const CreateCompany = () => {
  const [file, setFile] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      companyWebpage: '',
      companyDescription: '',
      productDescription: '',
      toneOfVoice: 'Simon Sinek',
      strategy: 'FOMO',
    },
  });

  const onSubmit = (data) => {
    console.log(data, file);
    // Handle form submission
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="w-full p-6 bg-transparent rounded-lg shadow-md">
      <Heading title="Company Information" description="Fill out the details about your company and product/service." />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="companyWebpage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Webpage</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="companyDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe your company..." {...field} />
                </FormControl>
                <FormMessage />
                <Button variant="outline" type="button" onClick={() => document.getElementById('fileInput').click()}>Attach File</Button>
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span className="text-sm text-gray-500">Optional: Attach a file related to your company.</span>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="productDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product/Service Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe your product or service..." {...field} />
                </FormControl>
                <FormMessage />
                <Button variant="outline" type="button" onClick={() => document.getElementById('fileInput').click()}>Attach File</Button>
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span className="text-sm text-gray-500">Optional: Attach a file related to your product or service.</span>
              </FormItem>
            )}
          />
          
          <FormItem className="w-full">
            <FormLabel>Connect CRM</FormLabel>
            <Button variant="outline" type="button" className="w-full">Connect CRM</Button>
          </FormItem>
          
          <FormField
            control={form.control}
            name="toneOfVoice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tone of Voice</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} >
                    <FormItem>
                      <RadioGroupItem value="Simon Sinek" id="simon" />
                      <FormLabel htmlFor="simon">Simon Sinek</FormLabel>
                    </FormItem>
                    <FormItem>
                      <RadioGroupItem value="Alex Hormozi" id="alex" />
                      <FormLabel htmlFor="alex">Alex Hormozi</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="strategy"
              render={({ field }) => (
                <FormItem>
                  <div className={`border p-4 rounded ${field.value === 'FOMO' ? 'border-blue-500' : ''}`} onClick={() => field.onChange('FOMO')}>
                    <h1 className='text-2xl font-semibold'>FOMO Strategy</h1>
                    <FormControl>
                      <p className='my-5'>FOMO strategy description</p>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="strategy"
              render={({ field }) => (
                <FormItem>
                  <div className={`border p-4 rounded ${field.value === 'AMSI' ? 'border-blue-500' : ''}`} onClick={() => field.onChange('AMSI')}>
                    <h1 className='text-2xl font-semibold'>AMSI Strategy</h1>
                    <FormControl>
                      <p className='my-5'>AMSI strategy description</p>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
          
          <Button type="submit" className="!bg-zinc-900 text-white">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
