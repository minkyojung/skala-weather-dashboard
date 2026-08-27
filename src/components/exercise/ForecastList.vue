<script setup>
import { computed } from 'vue'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useTemperature } from '@/composables/useTemperature.js'

const props = defineProps({
    days: {
        type: Array,
        required: true,
    },
})

const { unitSymbol, toDisplay } = useTemperature()

const displayDays = computed(() =>
    props.days.map(day => ({
        ...day,
        minTemp: toDisplay(day.minTemp),
        maxTemp: toDisplay(day.maxTemp),
    })),
)
</script>

<template>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead class="w-16">날짜</TableHead>
                <TableHead>날씨</TableHead>
                <TableHead class="text-right">최저 / 최고</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="day in displayDays" :key="day.date">
                <TableCell class="tabular-nums">{{ day.date.slice(5).replace('-', '/') }}</TableCell>
                <TableCell>
                    <span class="flex items-center gap-2">
                        <img
                            :src="`https://openweathermap.org/img/wn/${day.icon}.png`"
                            :alt="day.status"
                            width="32"
                            height="32"
                        />
                        {{ day.status }}
                    </span>
                </TableCell>
                <TableCell class="text-right tabular-nums">
                    {{ day.minTemp }} / {{ day.maxTemp }}{{ unitSymbol }}
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
</template>
