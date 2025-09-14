import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../UI/Button';

const schema = z.object({
  urls: z.string()
    .refine(val => val.split('\n').every(url => {
      try {
        new URL(url.trim());
        return true;
      } catch {
        return false;
      }
    }), 'All URLs must be valid')
});

type FormData = z.infer<typeof schema>;

interface ScanFormProps {
  onSubmit: (urls: string[]) => void;
  loading?: boolean;
}

export const ScanForm = ({ onSubmit, loading }: ScanFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onFormSubmit = (data: FormData) => {
    const urls = data.urls.split('\n').map(url => url.trim()).filter(Boolean);
    onSubmit(urls);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4" role='form'>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URLs to scan (one per line)
        </label>
        <textarea
          {...register('urls')}
          rows={5}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500"
          placeholder="https://example.com&#10;https://another-site.com"
        />
        {errors.urls && (
          <p className="text-red-600 text-sm mt-1">{errors.urls.message}</p>
        )}
      </div>
      
      <Button type="submit" loading={loading} className="w-full">
        Start Scan
      </Button>
    </form>
  );
};