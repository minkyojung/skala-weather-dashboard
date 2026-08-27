<script setup>
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import VHtmlXss from '../v-html-xss.vue'
import VText from '../v-text.vue'
import VHtml from '../v-html.vue'
import VBind from '../v-bind.vue'
import VBindDirective from '../v-bind-directive.vue'
import VBindAdvanced from '../v-bind-advanced.vue'
import VBindUserProfile from '../v-bind-user-profile.vue'
import VBindIf from '../v-bind-if.vue'
import VShow from '../v-show.vue'
import VOnClickCount from '../v-on-clickCount.vue'
import VOnMethodHandler from '../v-on-methodHandler.vue'
import VOnEventHandlingExample from '../v-on-eventHandling-example.vue'
import ViewEventHandlingEvent from '../view-eventHandling-$event.vue'
import Weather from '../weather.vue'
import ReactiveState from '../reactive-state.vue'
import ReactiveState2 from '../reactive-state-2.vue'
import ComputedWatcher from '../computed-watcher.vue'
import ComputedWatcherExample from '../compouted-watcher-example.vue'
import MultiSource from '../multi-source-133.vue'
import DeepWatch from '../deep-watch-135.vue'
import WatchReactive from '../watch-reactive.vue'
import WatchEffect from '../watch-effect.vue'
import Weather2 from '../weather-2.vue'
import ComponentLifecycle from '../component-lifecycle.vue'
import PropsEmitParent from '../PropsEmitParent.vue'
import SlotDefaultParent from '../SlotDefaultParent.vue'
import SlotNamedParent from '../SlotNamedParent.vue'
import SlotScopedParent from '../SlotScopedParent.vue'
import WeatherParent from '../WeatherParent.vue'
import StoreCounter from '../components/practices/library/StoreCounter.vue'

const practices = [
    { title: 'v-html XSS 학습', component: VHtmlXss },
    { title: 'v-text 디렉티브', component: VText },
    { title: 'v-html 디렉티브', component: VHtml },
    { title: 'v-bind 기본', component: VBind },
    { title: 'v-bind 고급 (스타일 바인딩)', component: VBindDirective },
    { title: 'v-bind 고급 (클래스 바인딩)', component: VBindAdvanced },
    { title: 'v-bind 고급 (단축 문법)', component: VBindUserProfile },
    { title: 'v-if / v-else-if / v-else', component: VBindIf },
    { title: 'v-show', component: VShow },
    { title: 'v-on 클릭 카운트', component: VOnClickCount },
    { title: 'v-on 메서드 핸들러', component: VOnMethodHandler },
    { title: 'v-on 이벤트 핸들링 예제', component: VOnEventHandlingExample },
    { title: 'v-on $event 활용', component: ViewEventHandlingEvent },
    { title: '날씨 Mockup (1일차)', component: Weather },
    { title: '반응형 상태 ref() 기초', component: ReactiveState },
    { title: '반응형 상태 reactive()', component: ReactiveState2 },
    { title: 'computed() 캐싱 동작', component: ComputedWatcher },
    { title: 'watch() 감시자', component: ComputedWatcherExample },
    { title: '다중 소스 watch', component: MultiSource },
    { title: 'deep watch', component: DeepWatch },
    { title: 'reactive() watch', component: WatchReactive },
    { title: 'watchEffect()', component: WatchEffect },
    { title: '날씨 Mockup (2일차)', component: Weather2 },
    { title: '컴포넌트 라이프사이클', component: ComponentLifecycle },
    { title: 'Props & Emits', component: PropsEmitParent },
    { title: 'Slot (Default)', component: SlotDefaultParent },
    { title: 'Slot (Named)', component: SlotNamedParent },
    { title: 'Slot (Scoped)', component: SlotScopedParent },
    { title: '날씨 컴포넌트 분리 (3일차)', component: WeatherParent },
    { title: 'Pinia Store 카운터', component: StoreCounter },
]
</script>

<template>
    <div class="max-w-3xl space-y-4">
        <header>
            <h1 class="text-2xl font-bold tracking-tight">Hands On</h1>
            <p class="mt-1 text-sm text-muted-foreground">
                수업 중 수행한 실습을 순서대로 보여줍니다. (총 {{ practices.length }}개)
            </p>
        </header>

        <Card v-for="(practice, index) in practices" :key="practice.title">
            <CardHeader>
                <CardTitle class="text-base text-muted-foreground">
                    {{ index + 1 }}. {{ practice.title }}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <component :is="practice.component" />
            </CardContent>
        </Card>
    </div>
</template>
