import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Utensils, Coffee, Apple, Sun, Save, Edit2, Loader2, CheckCircle } from "lucide-react";
import { supabase } from '@/lib/supabase';

interface DailyMenu {
    day: string;
    breakfast: string;
    lunch: string;
    snack: string;
}

interface FoodMenuProps {
    isEditable?: boolean;
}

const DEFAULT_MENU: DailyMenu[] = [
    { day: 'Monday', breakfast: '', lunch: '', snack: '' },
    { day: 'Tuesday', breakfast: '', lunch: '', snack: '' },
    { day: 'Wednesday', breakfast: '', lunch: '', snack: '' },
    { day: 'Thursday', breakfast: '', lunch: '', snack: '' },
    { day: 'Friday', breakfast: '', lunch: '', snack: '' },
];

const FoodMenu: React.FC<FoodMenuProps> = ({ isEditable = false }) => {
    const [menu, setMenu] = useState<DailyMenu[]>(DEFAULT_MENU);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('food_menu')
                .select('*')
                .order('day', { ascending: false }); // Ascending sort by sorting logic if needed, usually fixed days list is better

            if (error) throw error;

            if (data && data.length > 0) {
                // Merge fetched data with default structure to ensure correct order
                const orderedMenu = DEFAULT_MENU.map(defaultDay => {
                    const found = data.find(d => d.day === defaultDay.day);
                    return found || defaultDay;
                });
                setMenu(orderedMenu);
            }
        } catch (error) {
            console.error('Error fetching menu:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setSaveSuccess(false);

            const { error } = await supabase
                .from('food_menu')
                .upsert(menu, { onConflict: 'day' });

            if (error) throw error;

            setSaveSuccess(true);
            setIsEditing(false);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            console.error('Error saving menu:', error);
            alert('Failed to save menu changes.');
        } finally {
            setSaving(false);
        }
    };

    const updateDayResult = (index: number, field: keyof DailyMenu, value: string) => {
        const newMenu = [...menu];
        newMenu[index] = { ...newMenu[index], [field]: value };
        setMenu(newMenu);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in pb-12 relative">
            <div className="text-center mb-8 relative">
                <h1 className="text-4xl font-bold text-stone-700 mb-2 font-[Patrick_Hand]">Weekly Menu</h1>
                <p className="text-stone-500 font-medium">Nourishing little minds and bodies</p>

                {isEditable && (
                    <div className="absolute right-0 top-0 flex gap-2">
                        {isEditing ? (
                            <Button
                                onClick={handleSave}
                                disabled={saving}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200 shadow-md"
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                Save Changes
                            </Button>
                        ) : (
                            <Button
                                onClick={() => setIsEditing(true)}
                                variant="outline"
                                className="bg-white border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                            >
                                <Edit2 className="w-4 h-4 mr-2" />
                                Edit Menu
                            </Button>
                        )}
                    </div>
                )}
            </div>

            {saveSuccess && (
                <div className="flex items-center justify-center p-4 bg-emerald-50 text-emerald-700 rounded-lg mb-6 animate-fade-in">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <strong>Success!</strong> Menu updated successfully.
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {menu.map((day, index) => (
                    <Card key={day.day} className={`border-0 shadow-lg bg-white/80 transition-all duration-300 ${isEditing ? 'ring-2 ring-emerald-400 ring-offset-2' : 'hover:scale-105'}`}>
                        <CardHeader className="bg-emerald-50 rounded-t-3xl pb-4">
                            <CardTitle className="text-center text-emerald-800 font-[Patrick_Hand] text-2xl">
                                {day.day}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            {/* Breakfast */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-amber-500 font-bold text-sm uppercase tracking-wider">
                                    <Coffee className="w-4 h-4" />
                                    Breakfast
                                </div>
                                {isEditing ? (
                                    <Input
                                        value={day.breakfast}
                                        onChange={(e) => updateDayResult(index, 'breakfast', e.target.value)}
                                        className="bg-white/50 border-amber-200 focus-visible:ring-amber-400"
                                    />
                                ) : (
                                    <p className="text-stone-600 font-medium pl-6 min-h-[1.5rem]">{day.breakfast || '--'}</p>
                                )}
                            </div>

                            {/* Lunch */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-rose-500 font-bold text-sm uppercase tracking-wider">
                                    <Utensils className="w-4 h-4" />
                                    Lunch
                                </div>
                                {isEditing ? (
                                    <Input
                                        value={day.lunch}
                                        onChange={(e) => updateDayResult(index, 'lunch', e.target.value)}
                                        className="bg-white/50 border-rose-200 focus-visible:ring-rose-400"
                                    />
                                ) : (
                                    <p className="text-stone-600 font-medium pl-6 min-h-[1.5rem]">{day.lunch || '--'}</p>
                                )}
                            </div>

                            {/* Snack */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sky-500 font-bold text-sm uppercase tracking-wider">
                                    <Apple className="w-4 h-4" />
                                    Snack
                                </div>
                                {isEditing ? (
                                    <Input
                                        value={day.snack}
                                        onChange={(e) => updateDayResult(index, 'snack', e.target.value)}
                                        className="bg-white/50 border-sky-200 focus-visible:ring-sky-400"
                                    />
                                ) : (
                                    <p className="text-stone-600 font-medium pl-6 min-h-[1.5rem]">{day.snack || '--'}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default FoodMenu;
