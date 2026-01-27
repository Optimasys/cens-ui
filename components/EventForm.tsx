interface EventFormProps {
  eventType: string;
}

export default function EventForm({ eventType }: EventFormProps) {
  return (
    <div>{eventType}</div>
  );
}
