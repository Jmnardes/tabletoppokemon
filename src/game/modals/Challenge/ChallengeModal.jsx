import GenericModal from "@components/Modal/GenericModal"
import ChallengeTeam from "./ChallengeTeam"
import { useState } from "react"
import Challenge from "./Challenge"

export default function ChallengeModal({ event }) {
    const [bonus, setBonus] = useState(0)
    const [teamReady, setTeamReady] = useState(false)

    return (
        <GenericModal title={"Challenge"}>
            {teamReady ? (
                <Challenge
                    event={event}
                    bonus={bonus}
                />
            ) : (
                <ChallengeTeam 
                    event={event}
                    bonus={bonus} 
                    setBonus={setBonus} 
                    setTeamReady={setTeamReady} 
                />
            )}
        </GenericModal>
    )
}