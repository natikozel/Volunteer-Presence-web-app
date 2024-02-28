import {GradeList} from "./Container";
import {useCallback, useState} from "react";
import GradeListComponent from "./GradeListComponent";
import {ChevronRightIcon, EnvelopeOpenIcon} from "@radix-ui/react-icons";
import {Button} from "./ui/button";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "./ui/accordion";
import {Mail} from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
}
    from "./ui/alert-dialog";

const ListContent = ({data}: any) => {

    const [school, setSchool] = useState<any>();
    const [arrived, setArrived] = useState<string[]>([]);
    const handleSchoolPick = (e: any) => {
        e.preventDefault();
        setSchool(data[e.target.name]);

    };
    const handleSelect = useCallback((name: string) => {
        console.log(name);
        setArrived((preArrived: string[]): string[] => {
            const exist: string | undefined = preArrived.find(n => n === name);
            if (!exist)
                return [...preArrived, name];
            return preArrived.filter(n => n !== name);
        });
    }, []);

    const handleSubmit = () => {
        console.log(arrived);
    };

    const handleAccordion = (e: any) => {
        setArrived(prevArrived => {
            return prevArrived.filter(kid => !school[e.target.name].includes(kid));
        });
        console.log(school);
        console.log(e.target.name);
    };

    return (
        <div className="w-full flex flex-wrap flex-row justify-center align-middle container mx-auto">
            {school ?
                <div className="w-full xl:w-64">
                    <div className={"flex flex-col justify-end items-end"}>
                        <Button className="flex" style={{margin: "5px"}} variant="outline" size="icon"
                                onClick={handleSchoolPick}>
                            <ChevronRightIcon className="h-4 w-4"/>
                        </Button>
                        <h2>{school.title}</h2>
                    </div>
                    <Accordion type="multiple" className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger name={"fourth"} onClick={handleAccordion} style={{direction: 'rtl'}}>שכבה
                                ד</AccordionTrigger>
                            <AccordionContent>
                                <GradeListComponent onSelect={handleSelect} data={school.fourth}/>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger name={"fifth"} onClick={handleAccordion} style={{direction: 'rtl'}}>שכבה
                                ה</AccordionTrigger>
                            <AccordionContent>
                                <GradeListComponent onSelect={handleSelect} data={school.fifth}/>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger name={"sixth"} onClick={handleAccordion} style={{direction: 'rtl'}}>שכבה
                                ו</AccordionTrigger>
                            <AccordionContent>
                                <GradeListComponent onSelect={handleSelect} data={school.sixth}/>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <br/>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" style={{direction: 'ltr'}}
                                    className="mx-auto flex align-middle items-center">
                                <EnvelopeOpenIcon className="mr-2 h-4 w-4"/> שלח
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className={"w-4/8"}>
                            <AlertDialogHeader>
                                <AlertDialogTitle className={"mx-auto"}>{"?האם אתם בטוח"}</AlertDialogTitle>
                                <AlertDialogDescription className={"flex flex-column flex-wrap justify-end mx-auto"}>
                                    .אנא בדקו עצמכם שנית טרם סיום התהליך, לא ניתן יהיה לחזור אחורנית לאחר ביצוע השליחה
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>חזור</AlertDialogCancel>
                                <AlertDialogAction onClick={handleSubmit}>שלח</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

                :
                <div className={"mx-auto"}>
                    <div
                        className={"flex items-center justify-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"}>{'בחר בית ספר'}</div>
                    <br></br>
                    <ol className="flex flex-col mx-auto justify-content-evenly" style={{direction: 'rtl'}}>
                        {Object.keys(data).map(((key: any) =>
                                <li className={"mx-auto"} key={key}>
                                    <button
                                        className={"w-44 h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"}
                                        onClick={handleSchoolPick}
                                        name={key}>
                                        {data[key].title}</button>
                                </li>
                        ))}
                    </ol>
                </div>
            }

        </div>
    );
};

export default ListContent;