import { Injectable } from '@nestjs/common';

@Injectable()
export class AvailabilityService {
    generateSlotsForDate(date: Date, slotMinutes: number) {
        const slots: { start: Date; end: Date }[] = [];
        const startOfDay = new Date(date).setHours(9, 0, 0, 0);
        const endOfDay = new Date(date).setHours(17, 0, 0, 0);
        for (let time = startOfDay; time < endOfDay; time += slotMinutes * 60 * 1000) {
            const start = new Date(time);
            const end = new Date(time + slotMinutes * 60 * 1000);
            slots.push({ start, end });
        }
        return slots;
    }

    isWorkingDay(date: Date) {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    }

    async findNextAvailableSlots(checker: (s: Date, e: Date) => Promise<boolean>, from: Date, days: number, slotMinutes: number) {
        for (let i = 0; i < days; i++) {
            const day = new Date(from.getTime() + i * 24 * 60 * 60 * 1000);
            if (!this.isWorkingDay(day)) continue;
            const slots = this.generateSlotsForDate(day, slotMinutes);
            for (const s of slots) {
                const ok = await checker(s.start, s.end);
                if (ok) return s;
            }
        }
        return null;
    }
}
