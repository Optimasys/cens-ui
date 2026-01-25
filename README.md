# Civil Engineering National Summit (CENS UI)

Civil Engineering National Summit is the largest initiative by Ikatan Mahasiswa Sipil Universitas Indonesia that brings together a coalition of students, innovators, and corporates working together to help Indonesia adapt, overcome, and grow beyond its challenges in the built environment.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **Form Handling**: React Hook Form + Zod (validation)
- **Database**: Supabase (PostgreSQL)
- **File Storage**: Google Drive API
- **Sheets Integration**: Google Apps Script Webhooks
- **API Communication**: Axios

## Project Structure

```
cens-ui/
├── app/
│   ├── api/
│   │   ├── submit-competition/
│   │   │   └── route.ts          # Competition submission API
│   │   └── submit-event/
│   │       └── route.ts          # Event submission API
│   ├── (pages)/
│   │   ├── about/
│   │   ├── timeline/
│   │   ├── contact/
│   │   ├── competitions/
│   │   │   ├── innovative-essay/
│   │   │   └── national-tender/
│   │   └── events/
│   │       ├── workshop/
│   │       ├── student-discussion-forum/
│   │       └── national-summit/
│   ├── layout.tsx                # Root layout with Navbar & Footer
│   ├── page.tsx                  # Home page
│   ├── globals.css               # Tailwind styles
│   └── favicon.ico
├── components/
│   ├── Navbar.tsx                # Navigation component
│   ├── Footer.tsx                # Footer component
│   ├── CompetitionForm.tsx       # Competition form skeleton
│   └── EventForm.tsx             # Event form skeleton
├── lib/
│   ├── types.ts                  # TypeScript interfaces
│   ├── validations.ts            # Zod schemas
│   ├── supabase.ts               # Supabase client & helpers
│   ├── google-drive.ts           # Google Drive API utilities
│   ├── google-sheets-webhook.ts  # Google Sheets webhook handler
│   ├── file-utils.ts             # File handling utilities
│   └── errors.ts                 # Error handling classes
├── public/
├── .env.example                  # Environment variables template
├── package.json
├── tsconfig.json                 # TypeScript strict mode enabled
├── next.config.ts
├── postcss.config.mjs
├── tailwind.config.ts
├── eslint.config.mjs
└── README.md                     # This file
```

## Setup Instructions

### 1. Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account
- Google Cloud project
- Git

### 2. Installation

```bash
# Clone the repository
git clone <repo-url>
cd cens-ui

# Install dependencies
npm install

# Create .env.local from .env.example
cp .env.example .env.local
```

### 3. Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### 4. Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

See `.env.example` for a complete list. Key variables:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `GOOGLE_SERVICE_ACCOUNT_KEY`: Google Cloud service account JSON
- `GOOGLE_SHEETS_WEBHOOK_URL`: Google Apps Script web app URL

## Error Handling

All API routes include comprehensive error handling:
- Validation errors (400)
- File upload errors (500)
- Database errors (500)
- Google Drive errors (500)
- Server errors with detailed logging

The Sheets webhook failures do NOT cause submission failure to maintain user experience.

## Development Notes

### Adding New Competitions

1. Add to `CompetitionType` in `lib/types.ts`
2. Update `competitionFormSchema` in `lib/validations.ts`
3. Create new page in `app/(pages)/competitions/[name]/`
4. Update navigation in `components/Navbar.tsx`

### Adding New Events

1. Add to `EventType` in `lib/types.ts`
2. Update `eventFormSchema` in `lib/validations.ts`
3. Create new page in `app/(pages)/events/[name]/`
4. Update navigation in `components/Navbar.tsx`

### Customizing Form Validation

Edit the schemas in `lib/validations.ts` to change validation rules. All validations use Zod.

### File Upload Customization

Edit `lib/google-drive.ts` to customize:
- File naming convention
- Folder organization
- Sharing permissions

## Page Content

The following pages are ready for design content:
- `/` - Home
- `/about` - About Us
- `/timeline` - Timeline
- `/competitions` - Competitions listing
- `/competitions/innovative-essay` - With registration form
- `/competitions/national-tender` - With registration form
- `/events` - Events listing
- `/events/workshop` - With registration form
- `/events/student-discussion-forum` - With registration form
- `/events/national-summit` - With registration form
- `/contact` - Contact Us

## Troubleshooting

### Submissions not appearing in Google Sheets
- Verify `GOOGLE_SHEETS_WEBHOOK_URL` is correctly set
- Check that the Google Apps Script is deployed correctly
- Verify the script has proper permissions to edit your spreadsheet

### Files not uploading to Google Drive
- Check service account credentials in `GOOGLE_SERVICE_ACCOUNT_KEY`
- Ensure service account has editor permissions on the target folder
- Verify folder IDs are correct

### Database errors
- Verify Supabase credentials in `.env.local`
- Check that tables exist and have correct schema
- Ensure network connectivity

## Performance Considerations
- File uploads are converted to Buffer for efficient processing
- Database queries use indexes on email and created_at columns
- Google Sheets webhook calls are non-blocking
- Forms include client-side validation to reduce server load

## Security
- All file uploads are validated (type, size)
- Form data is validated with Zod before processing
- SQL injection protection through Supabase's PostgREST
- CORS configuration can be added for cross-origin requests
- No sensitive data is exposed in error messages

## Support
For issues or questions, please open an issue on the repository.
