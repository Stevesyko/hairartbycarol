import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const BookingButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button
        variant="luxuryOutline"
        size="lg"
        onClick={() => window.open("https://www.vagaro.com/habcandbeauty", "_blank")}
      >
        <Calendar className="mr-2" size={20} />
        Book on Vagaro
      </Button>
      <Button
        variant="luxuryOutline"
        size="lg"
        onClick={() => window.open("https://www.styleseat.com/m/v/carolinemenchaca", "_blank")}
      >
        <Calendar className="mr-2" size={20} />
        Book on StyleSeat
      </Button>
    </div>
  );
};

export default BookingButtons;
