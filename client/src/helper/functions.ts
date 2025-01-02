import { IAncestryUser } from "@/interface/User"

export const stepsCompleted = (ancestryUser: IAncestryUser[]): number[] => {

    let completed = 0
    let steps = 0

    for (let i = 0; i < ancestryUser.length; i++) {
        for (let j = 0; j < ancestryUser[i].checklist.length; j++) {
            if(ancestryUser[i].checklist[j].isChecked) {
                completed += 1
            }
            steps += 1
        }
    }

    return [completed, steps]

}