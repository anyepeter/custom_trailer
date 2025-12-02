import TeamCard from './TeamCard';
import { TeamMember } from '@/data/team';

interface TeamGridProps {
  members: TeamMember[];
}

export default function TeamGrid({ members }: TeamGridProps) {
  return (
    <div className="w-full bg-gray-50 py-16">
      <div className="container mx-auto px-4" style={{ maxWidth: '980px' }}>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {members.map((member) => (
            <TeamCard
              key={member.id}
              name={member.name}
              role={member.role}
              image={member.image}
              alt={member.alt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
