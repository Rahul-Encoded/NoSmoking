import FeatureSection from "./FeatureSection";
import FnHSaving from "./FnHSaving";
import HeroSection from "./HeroSection";

export default function DashBoard() {

	return (
		<div className="flex-col">
			<HeroSection></HeroSection>
			<FeatureSection></FeatureSection>
			<FnHSaving></FnHSaving>
		</div>
	)
}