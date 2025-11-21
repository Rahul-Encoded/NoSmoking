import FeatureSection from "./FeatureSection";
import HeroSection from "./HeroSection";

export default function DashBoard(){

	return(
		<div className="flex-col">
			<HeroSection></HeroSection>
			<FeatureSection></FeatureSection>
		</div>
	)
}