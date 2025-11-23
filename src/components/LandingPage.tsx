import FeatureSection from "./FeatureSection";
import FnHSaving from "./FnHSaving";
import HeroSection from "./HeroSection";
import AppFlowSection from "./AppFlowSection";

export default function LandingPage() {

	return (
		<div className="flex-col">
			<HeroSection></HeroSection>
			<FeatureSection></FeatureSection>
			<AppFlowSection></AppFlowSection>
			<FnHSaving></FnHSaving>
		</div>
	)
}