import React, { useState } from "react";
import { Skill, mySkills } from "../../data/skills";

const Skills: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Programming Languages"]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = Array.from(new Set(mySkills.map((skill) => skill.category)));

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery("");
  };

  const filteredSkills = selectedCategories.length
    ? mySkills.filter((skill) => selectedCategories.includes(skill.category) && skill.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : mySkills.filter((skill) => skill.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search skills"
        className="bg-slate-100 text-black px-2 py-1 m-1 rounded"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Handle input change
      />

      <button className="bg-slate-100 text-slate-600 px-2 py-1 m-1 rounded" onClick={clearFilters}>
        Clear
      </button>
      <div>
        {categories.map((category, index) => (
          <button
            key={index}
            className={`bg-stone-400 text-white px-2 py-1 m-1 rounded ${selectedCategories.includes(category) ? "bg-stone-600 button-transition" : "bg-slate-500 button-transition"}`}
            onClick={() => toggleCategory(category)}
          >
            {category}
          </button>
        ))}

        <div className="flex flex-wrap mt-2">
          {filteredSkills.map((skill: Skill, index: number) => (
            <div key={index} className="bg-orange-400 text-white px-2 py-1 m-1 rounded">
              {skill.name} ({skill.experience})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
