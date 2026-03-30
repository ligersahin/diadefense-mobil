import { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { supabase } from '../../src/lib/supabase'

export default function TodayScreen() {
  const [day, setDay] = useState<any>(null)
  const [meals, setMeals] = useState<any[]>([])

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    // 1) Day 41
    const { data: dayData } = await supabase
      .from('days')
      .select('*')
      .eq('day_number', 41)
      .single()

    if (!dayData) return

    setDay(dayData)

    // 2) Meals for that day
    const { data: mealsData } = await supabase
      .from('meals')
      .select('*')
      .eq('day_id', dayData.id)

    setMeals(mealsData || [])
  }

  if (!day) {
    return <Text>Loading...</Text>
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        {day.title}
      </Text>

      <Text style={{ marginTop: 10 }}>
        {day.defi_message}
      </Text>

      {meals.map((meal) => (
        <View key={meal.id} style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>
            {meal.meal_type}
          </Text>
          <Text>{meal.title_tr}</Text>
        </View>
      ))}
    </ScrollView>
  )
}
