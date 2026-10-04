export interface BookingFormData {
  fullName: string;
  email: string;
  websiteUrl: string;
  projectType: 'saas' | 'ecommerce' | 'mobile-app' | 'landing-page' | 'other';
  selectedDate: string;
  selectedTime: string;
  notes?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface DaySchedule {
  dateString: string;
  dayLabel: string;
  dateNumber: string;
  monthLabel: string;
  slots: TimeSlot[];
}
