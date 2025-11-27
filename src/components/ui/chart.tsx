"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"]
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        className={cn(
          "flex aspect-auto justify-center text-xs",
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-axis_line]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-surface]:overflow-visible [&_.recharts-wrapper]:outline-none",
          className
        )}
        {...props}
      >
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

function ChartTooltip(
  props: React.ComponentProps<typeof RechartsPrimitive.Tooltip>
) {
  const { config } = useChart()

  return (
    <RechartsPrimitive.Tooltip
      contentStyle={{
        outline: "none",
        border: "none",
      }}
      {...props}
    />
  )
}

function ChartTooltipContent(props: any) {
  const { config } = useChart()
  const { active, payload } = props

  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-background p-2 shadow-md">
        <div className="grid grid-cols-2 gap-2">
          {payload.map((item: any, index: number) => {
            const key = `${item.dataKey}`
            const itemConfig = config[key as keyof typeof config]

            return (
              <div key={`${item.dataKey}-${index}`} className="flex flex-col">
                <span className="text-xs text-muted-foreground">
                  {itemConfig?.label || key}
                </span>
                <span
                  className="font-bold text-xs"
                  style={{
                    color:
                      item.color ||
                      itemConfig?.color ||
                      "hsl(var(--muted-foreground))",
                  }}
                >
                  {item.value}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return null
}

export { ChartContainer, ChartTooltip, ChartTooltipContent }
